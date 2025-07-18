# Official Python image
FROM python:3.13

# Working directory inside container
WORKDIR /app

# Python requirements
COPY requirements.txt .

# Insatall Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

#Command to run when the container starts
CMD ["python", "scrape.py]
