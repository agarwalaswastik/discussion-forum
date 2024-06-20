import Popup from "./Popup";
import ThemedButton from "../ThemedButton";

interface TextFieldPopupAttributes {
  title: string;
  value: string;
  setValue: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function TextFieldPopup({ title, value, setValue, onSave, onCancel }: TextFieldPopupAttributes) {
  return (
    <Popup title={title}>
      <input
        id="text-field-popup"
        name="text-field-popup"
        className="bg-primary border-slate focus:border-accent rounded-lg border-2 outline-none ~p-1/2"
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
