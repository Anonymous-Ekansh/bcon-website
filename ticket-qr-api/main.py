from flask import Flask, request, send_file, jsonify
from PIL import Image, ImageDraw, ImageFont
import qrcode
import qrcode.image.pil
import os
from io import BytesIO
import textwrap

app = Flask(__name__)

@app.route('/ticket/view', methods=['GET'])
def view_ticket():
    # Get the bookingId and name from query parameter
    booking_id = request.args.get('bookingId')
    name = request.args.get('name')

    if not booking_id:
        return jsonify({"error": "Booking ID is required"}), 400

    # If name is not provided, use the default event date
    if not name:
        name = "9th November 2024"

    # Generate ticket with QR code
    try:
        ticket_image = generate_ticket_with_qr(booking_id, name)
        img_io = BytesIO()
        ticket_image.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png')
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def generate_ticket_with_qr(booking_id, name):
    # Load the ticket template
    template_path = 'images/bcon_ticket_template.png'  # Updated path to the template
    if not os.path.exists(template_path):
        raise FileNotFoundError("Ticket template not found.")

    ticket = Image.open(template_path)

    # Generate the QR code with a transparent background
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(booking_id)
    qr.make(fit=True)

    # Create the QR code with transparent background
    qr_img = qr.make_image(fill_color="#FB8328", back_color="#892B15").convert("RGBA")
    qr_img = qr_img.resize((800, 800))  # Resize the QR code to fit on the ticket

    # Set the position where you want the QR code to be placed (in pixels)
    qr_position = (390, 500)  # (x, y) pixel coordinates

    # Paste the QR code onto the ticket with transparency
    ticket.paste(qr_img, qr_position, qr_img)

    # Draw the participant's name or event date on the ticket
    draw = ImageDraw.Draw(ticket)
    font_path = "images/FontsFree-Net-Dream-Avenue.ttf"  # Make sure you have a suitable font file or adjust the path
    try:
        font = ImageFont.truetype(font_path, 100)  # Increased font size
    except IOError:
        font = ImageFont.load_default()  # Use default font if custom one is not available

    # Wrap the text if it's too long
    max_width = 20  # Adjust this value as needed
    wrapped_text = textwrap.fill(name, width=max_width)

    # Calculate the position to place the wrapped text slightly below the QR code
    text_y_position = qr_position[1] + qr_img.height + 10  # Positioned right under the QR code, adjust the spacing if needed
    lines = wrapped_text.split('\n')
    for line in lines:
        text_bbox = draw.textbbox((0, 0), line, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_x_position = (ticket.width // 2) - (text_width // 2)
        draw.text((text_x_position, text_y_position), line, font=font, fill="white")
        text_y_position += 110  # Adjust line spacing as needed

    return ticket

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
