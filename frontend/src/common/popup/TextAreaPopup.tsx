import Popup from "./Popup";
import ThemedButton from "../ThemedButton";

interface TextAreaPopupAttributes {
  title: string;
  value: string;
  setValue: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function TextAreaPopup({ title, value, setValue, onSave, onCancel }: TextAreaPopupAttributes) {
  return (
    <Popup title={title}>
      <textarea
        rows={10}
        id="text-area-popup"
        name="text-area-popup"
        className="bg-primary border-slate focus:border-accent resize-none rounded-lg border-2 outline-none ~p-1/2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex items-center justify-center ~gap-2/4">
        <ThemedButton onClick={onSave}>Save</ThemedButton>
        <ThemedButton onClick={onCancel}>Cancel</ThemedButton>
      </div>
    </Popup>
  );
}
