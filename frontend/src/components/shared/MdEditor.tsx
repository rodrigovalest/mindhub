import "easymde/dist/easymde.min.css";

import ReactMarkdown from 'react-markdown';
import { SimpleMdeReact } from "react-simplemde-editor";
import { Options } from "easymde";
import { useCallback, useMemo } from "react";
import { renderToStaticMarkup } from 'react-dom/server';

interface IMdEditor {
  state: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
}


const MdEditor = ({ state, setState }: IMdEditor) => {
  const onChange = useCallback((value: string) => setState(value), []);

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      previewRender: (markdownPlaintext) => {
        return renderToStaticMarkup(
          <ReactMarkdown className="renderMd">{markdownPlaintext}</ReactMarkdown>
        );
      }
    } as Options;
  }, []);

  return (
    <SimpleMdeReact
      options={options}
      value={state}
      onChange={onChange}
      className="bg-white rounded-md block"
    />
  );
}

export default MdEditor;
