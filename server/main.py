# 예시: Flask를 사용한 간단한 API 서버 구성
# server: main.py

from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/api/blocks')
def get_blocks():
    conn = sqlite3.connect('./db/automations.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM automation_blocks")
    blocks = cursor.fetchall()
    conn.close()
    
    # 변환 예시: 데이터베이스 결과를 JSON 형식으로 변환, desc 값이 없을 경우 빈 문자열 전송
    blocks_json = [
        {
            "func_name": block[0],
            "args1_name": block[1],
            "args1_type": block[2],
            "args1_value": block[3],
            "args2_name": block[4],
            "args2_type": block[5],
            "args2_value": block[6],
            "args3_name": block[7],
            "args3_type": block[8],
            "args3_value": block[9],
            "args4_name": block[10],
            "args4_type": block[11],
            "args4_value": block[12],
            "args5_name": block[13],
            "args5_type": block[14],
            "args5_value": block[15],
            "desc": block[-1].encode('utf-8').decode('utf-8') if block[-1] else ""  # UTF-8로 인코딩 후 디코딩, 없을 경우 빈 문자열 처리
        } for block in blocks
    ]
    
    return jsonify(blocks_json)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
