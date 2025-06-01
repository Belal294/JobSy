


const ToolbarButton = ({ children, title, onClick }) => (
  <button
    type="button"
    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
    title={title}
    onClick={onClick}
  >
    {children}
  </button>
)

const RichTextToolbar = ({ onCommand }) => (
  <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-wrap">
    <ToolbarButton title="Bold" onClick={() => onCommand('bold')}>
      <strong>B</strong>
    </ToolbarButton>
    <ToolbarButton title="Italic" onClick={() => onCommand('italic')}>
      <em>I</em>
    </ToolbarButton>
    <ToolbarButton title="Underline" onClick={() => onCommand('underline')}>
      <u>U</u>
    </ToolbarButton>
    <ToolbarButton title="Strikethrough" onClick={() => onCommand('strikethrough')}>
      <s>S</s>
    </ToolbarButton>
    <div className="w-px h-6 bg-gray-300 mx-1"></div>
    <ToolbarButton title="Quote" onClick={() => onCommand('formatBlock', 'blockquote')}>""</ToolbarButton>
    <ToolbarButton title="Code" onClick={() => onCommand('formatBlock', 'pre')}>{"<>"}</ToolbarButton>
    <div className="w-px h-6 bg-gray-300 mx-1"></div>
    <ToolbarButton title="H1" onClick={() => onCommand('formatBlock', 'h1')}>
      <strong>H₁</strong>
    </ToolbarButton>
    <ToolbarButton title="H2" onClick={() => onCommand('formatBlock', 'h2')}>
      <strong>H₂</strong>
    </ToolbarButton>
    <div className="w-px h-6 bg-gray-300 mx-1"></div>
    <ToolbarButton title="Bullet List" onClick={() => onCommand('insertUnorderedList')}>•</ToolbarButton>
    <ToolbarButton title="Numbered List" onClick={() => onCommand('insertOrderedList')}>1.</ToolbarButton>
    <div className="w-px h-6 bg-gray-300 mx-1"></div>
    <ToolbarButton title="Subscript" onClick={() => onCommand('subscript')}>X₂</ToolbarButton>
    <ToolbarButton title="Superscript" onClick={() => onCommand('superscript')}>X²</ToolbarButton>
    <div className="w-px h-6 bg-gray-300 mx-1"></div>
    <ToolbarButton title="Align Left" onClick={() => onCommand('justifyLeft')}>⫷</ToolbarButton>
    <ToolbarButton title="Align Center" onClick={() => onCommand('justifyCenter')}>≡</ToolbarButton>
    <ToolbarButton title="Align Right" onClick={() => onCommand('justifyRight')}>⫸</ToolbarButton>
    <div className="w-px h-6 bg-gray-300 mx-1"></div>
    <select className="px-2 py-1 text-sm border border-gray-300 rounded" onChange={(e) => onCommand('formatBlock', e.target.value)}>
      <option value="p">Normal</option>
      <option value="h1">Heading 1</option>
      <option value="h2">Heading 2</option>
    </select>
    <select className="px-2 py-1 text-sm border border-gray-300 rounded ml-2" onChange={(e) => onCommand('fontName', e.target.value)}>
      <option value="sans-serif">Sans Serif</option>
      <option value="serif">Serif</option>
      <option value="monospace">Monospace</option>
    </select>
    <ToolbarButton title="Text Color" onClick={() => onCommand('foreColor', prompt('Enter color (e.g., red or #RRGGBB):'))}>A</ToolbarButton>
    <ToolbarButton title="Background Color" onClick={() => onCommand('backColor', prompt('Enter background color (e.g., yellow or #RRGGBB):'))}>🎨</ToolbarButton>
    {/* Removed the 'More Options' button as its functionality is unclear without further context */}
  </div>
)

const RichTextEditor = ({ value, onChange, placeholder, name }) => {
  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value)
    // Manually trigger change to update React state, as execCommand doesn't
    // directly update the textarea's value prop.
    onChange({
      target: {
        name,
        value: document.getElementById(`richtext-editor-${name}`).innerHTML,
      },
    })
  }

  // To properly handle rich text editing with execCommand, we need a contenteditable div.
  // The textarea is mainly for displaying the raw HTML/text value for debugging or if we only want basic input.
  // For a true rich text editor, you'd typically use a contenteditable div and manage its content.
  // For simplicity, I'm adapting it to use a textarea and execCommand, but note this is a limitation.
  // A robust rich text editor would involve libraries like Draft.js, Slate.js, or TinyMCE.

  const handleInput = (e) => {
    onChange({ target: { name, value: e.target.innerHTML } });
  };

  return (
    <div className="border border-gray-300 rounded-md">
      <RichTextToolbar onCommand={handleCommand} />
      <div
        id={`richtext-editor-${name}`} // Unique ID for each editor instance
        contentEditable={true}
        onInput={handleInput}
        className="text-black w-full px-3 py-2 border-0 rounded-b-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none min-h-[150px] overflow-auto"
        dangerouslySetInnerHTML={{ __html: value }} // Use dangerouslySetInnerHTML to render HTML
        placeholder={placeholder} // Placeholder won't work directly with contenteditable div without extra JS
      />
    </div>
  )
}

export default RichTextEditor