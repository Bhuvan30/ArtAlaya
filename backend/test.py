from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import torch
import clip
import io

app = FastAPI()

# Load CLIP model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Example product categories (add your own here)
product_labels = [
    "t-shirt", "shoes", "backpack", "jacket", "sunglasses",
    "laptop", "smartphone", "watch", "hat", "handbag"
]

# Encode all text labels
text_tokens = clip.tokenize(product_labels).to(device)
with torch.no_grad():
    text_features = model.encode_text(text_tokens)

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image_input = preprocess(image).unsqueeze(0).to(device)

        with torch.no_grad():
            image_features = model.encode_image(image_input)
            image_features /= image_features.norm(dim=-1, keepdim=True)
            text_features_norm = text_features / text_features.norm(dim=-1, keepdim=True)
            similarity = (image_features @ text_features_norm.T).squeeze(0)

        # Get top 3 predictions
        top_probs, top_labels = similarity.topk(3)
        predictions = [
            {"label": product_labels[idx], "score": prob.item()}
            for idx, prob in zip(top_labels, top_probs)
        ]

        return JSONResponse(content={"predictions": predictions})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
