// 試し書きするためのファイルです

import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function MyEditorWithImages() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // エディタのコンテンツが変更されたときのハンドラ
    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    return (
        <div>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                    image: { uploadEnabled: true, uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false } },
                }}
            />
        </div>
    );
}

// 画像をアップロードするコールバック関数
const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ data: { link: reader.result } });
        reader.onerror = error => reject(error);
    });
};

export default MyEditorWithImages;
