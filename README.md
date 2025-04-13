# Brand-Colour-Palette-Generator
Generates colours based on industry, brand voice, and brand tone. 

# Brand Colour Palette Generator API Documentation

This API provides a way to generate a color palette based on an industry, voice, and tone. The API returns a set of colors that align with the requested criteria, such as name, hex, RGB, HSL, CMYK, and description.

---

## Base URL

```
https://brand-colour-palette-generator-o41k.vercel.app/api/color
```

---

## API Endpoint

### `GET /api/color`

This endpoint returns a color palette based on the specified industry, voice, and tone. If no matching colors are found, it returns an error.

---

## Query Parameters

- **`industry`** (required): The industry for which to generate the color palette.  
    _Example_: `health-holwell`, `tech-saas`, `creative-video`

- **`voice`** (required): The voice or style of the brand.  
    _Example_: `minimalist`, `authentic`, `bold`

- **`tone`** (required): The tone of the brand.  
    _Example_: `calming`, `bold`, `playful`

---

## Example Request

```
GET https://brand-colour-palette-generator-o41k.vercel.app/api/color?industry=health-holwell&voice=minimalist&tone=calming
```

---

## Example Response (Success)

```json
{
    "name": "Slate Serenity",
    "hex": "#6D8292",
    "rgb": "109, 130, 146",
    "hsl": "204, 15%, 50%",
    "cmyk": "25%, 11%, 0%, 43%",
    "description": "A calm, muted blue-gray that soothes like a quiet horizon."
}
```

---

## Example Response (Error)

```json
{
    "error": "No matching color found."
}
```

---

## Error Codes

- **`400`**: Missing required parameters (`industry`, `voice`, or `tone`).
- **`404`**: No matching color found.
- **`500`**: Internal server error.

---

## Available Values

### Industries

- `health-holwell`
- `tech-saas`
- `tech-ai`
- `tech-ecommerce`
- `tech-fintech`
- `tech-gaming`
- `tech-cybersecurity`
- `tech-iot`
- `tech-blockchain`
- `creative-webdesign`
- `creative-graphic`
- `creative-video`
- `creative-marketing`
- `creative-photography`
- `creative-animation`
- `creative-uxui`
- `retail-fashion`
- `retail-home`
- `retail-food`
- `retail-electronics`
- `retail-beauty`
- `retail-sporting`
- `retail-luxury`
- `prof-legal`
- `prof-consulting`
- `prof-accounting`
- `prof-hr`
- `prof-realestate`
- `prof-architecture`
- `prof-engineering`
- `health-clinic`
- `health-wellness`
- `health-pharma`
- `health-mental`
- `health-dental`
- `health-medtech`
- `hosp-hotel`
- `hosp-restaurant`
- `hosp-travel`
- `hosp-events`
- `hosp-tourism`
- `edu-school`
- `edu-elearning`
- `edu-tutoring`
- `edu-training`
- `nonprofit-charity`
- `nonprofit-env`
- `nonprofit-social`
- `nonprofit-arts`
- `manuf-auto`
- `manuf-electronics`
- `manuf-food`
- `manuf-textile`
- `other`

### Voices

- `Minimalist`
- `Authentic`
- `Bold`
- `Creative`
- `Elegant`
- `Energetic`
- `Friendly`
- `Innovative`
- `Reliable`
- `Sophisticated`
- `Trustworthy`

### Tones

- `Calming`
- `Friendly`
- `Professional`
- `Bold`
- `Playful`
- `Inspirational`
- `Trustworthy`
- `Minimalist`
- `Luxurious`
- `Authentic`
- `Energetic`
- `Compassionate`
- `Futuristic`

---

## Example Queries

Here are some example queries to test the API:

1. **Health Industry - Minimalist Voice - Calming Tone**
    ```
    GET https://brand-colour-palette-generator-o41k.vercel.app/api/color?industry=health-holwell&voice=minimalist&tone=calming
    ```

2. **Tech SaaS - Bold Voice - Futuristic Tone**
    ```
    GET https://brand-colour-palette-generator-o41k.vercel.app/api/color?industry=tech-saas&voice=bold&tone=futuristic
    ```

3. **Creative Video - Innovative Voice - Playful Tone**
    ```
    GET https://brand-colour-palette-generator-o41k.vercel.app/api/color?industry=creative-video&voice=innovative&tone=playful
    ```

4. **Retail Luxury - Elegant Voice - Trustworthy Tone**
    ```
    GET https://brand-colour-palette-generator-o41k.vercel.app/api/color?industry=retail-luxury&voice=elegant&tone=trustworthy
    ```

5. **Health Pharma - Authentic Voice - Energetic Tone**
    ```
    GET https://brand-colour-palette-generator-o41k.vercel.app/api/color?industry=health-pharma&voice=authentic&tone=energetic
    ```

---

## Notes

- Ensure that all query parameters (`industry`, `voice`, `tone`) are **lowercase** to match the values stored in the database.
- If no matching colors are found, the API will return a `404` error with the message `"No matching color found."`.

---

For further questions or issues, feel free to reach out to the API team.
