import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

export const TextEdit=({type, onSave}:{type:'title'|'content', onSave:(value:string)=>void})=> {
    const [editorValue, setEditorValue] = useState('');
    const editorRef = useRef<ReactQuill>(null);

    const handleChange = (value:string)=>{
      setEditorValue(value);
      onSave(value)
    }

    useEffect(() => {
      if (type === 'title') {
        editorRef.current?.focus();
      }
    }, [type]);

   

    let placeholder = '';
    if (type === 'title') {
    placeholder = 'Title';
    } else if (type === 'content') {
    placeholder = 'Tell your story...';
    }
  
    return (
      <ReactQuill
      ref={editorRef}
        value={editorValue}
        onChange={handleChange}
        modules={{
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['code-block'],
                [{ 'color': [] }, { 'background': [] }],
                [{ header: [1, 2, 3, 4, false] }],
                ['link']    
            ]
          }}
          theme="bubble"
          placeholder={placeholder}
      />
    );
  }