import MyButton from "./MyButton";
import Popup from "./Popup";

export default function TextPopup({
  input,
  text,
  setText,
  onSave,
  onCancel,
}: {
  input: string;
  text: string;
  setText: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <Popup title={`Enter ${input}`}>
      <textarea
        rows={10}
        id="popup-textarea"
        name="popup-textarea"
        className="bg-primary resize-none rounded-lg p-2 outline-none border-2 border-slate focus:border-accent"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center justify-center ~gap-2/4">
        <MyButton onClick={onSave}>Save</MyButton>
        <MyButton onClick={onCancel}>Cancel</MyButton>
      </div>
    </Popup>
  );
}
