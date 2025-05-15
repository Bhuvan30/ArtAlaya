from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
from torchvision import models, transforms
import io
import os

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE_DIR, "imagenet_classes.txt")) as f:
    imagenet_classes = [line.strip() for line in f.readlines()]

# Load pretrained model once
model = models.resnet50(pretrained=True)
model.eval()

# Define transforms to prepare image for the model
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],  # ImageNet means
        std=[0.229, 0.224, 0.225]    # ImageNet stds
    ),
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read the uploaded image file
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    # Preprocess the image
    input_tensor = preprocess(image)
    input_batch = input_tensor.unsqueeze(0)  # batch of 1
    
    # Perform inference
    with torch.no_grad():
        output = model(input_batch)
    
    # Get predicted class index
    probabilities = torch.nn.functional.softmax(output[0], dim=0)
    top1_prob, top1_catid = torch.topk(probabilities, 1)
    predicted_label = imagenet_classes[top1_catid]

    return {
        "filename": file.filename,
        "prediction": predicted_label,
        "confidence": float(top1_prob)
    }
