import Popup from "./Popup";
import ThemedButton from "../ThemedButton";

interface TextInputPopupAttributes {
  title: string;
  value: string;
  setValue: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function TextInputPopup({ title, value, setValue, onSave, onCancel }: TextInputPopupAttributes) {
  return (
    <Popup title={title}>
      <textarea
        rows={10}
        id="text-input-popup"
        name="text-input-popup"
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
