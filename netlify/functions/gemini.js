exports.handler = async function(event, context) {
    // Chỉ cho phép gọi bằng phương thức POST
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Lấy API Key từ "két sắt" của Netlify
    const API_KEY = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

    try {
        // Lấy nội dung tin nhắn từ web gửi lên
        const payload = JSON.parse(event.body);

        // Gọi sang máy chủ của Gemini
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // Trả kết quả về cho web
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "Failed fetching data" }) 
        };
    }
};
