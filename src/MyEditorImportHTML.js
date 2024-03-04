import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import 'draft-js/dist/Draft.css';

function MyEditorImportHTML() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // JavaScriptを除外する関数
    const removeScripts = (html) => {
        return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    };

    // CSSを除外する関数
    const removeStyles = (html) => {
        return html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    };

    // HTMLファイルが選択されたときの処理
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        // ファイル読み込みが完了したときの処理
        reader.onload = () => {
            let htmlContent = reader.result; // ファイルの内容を取得
            htmlContent = removeStyles(htmlContent);
            htmlContent = removeScripts(htmlContent);
            console.log(htmlContent);
            const newEditorState = EditorState.createWithContent(
                stateFromHTML(htmlContent) // HTMLをContentStateに変換してEditorStateを作成
            );
            setEditorState(newEditorState); // EditorStateを更新
        };

        // ファイルをテキストとして読み込む
        reader.readAsText(file);
    };



    return (
        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
            {/* ファイルアップロード用のフォーム */}
            <input type="file" onChange={handleFileUpload} />
            {/* Draft.jsのエディタ */}
            <Editor
                editorState={editorState}
                onChange={setEditorState}
            />
        </div>
    );
}

export default MyEditorImportHTML;

