interface Props {
  default: string;
  isVisible: boolean;
}

export default function AddressForm({
  default: defaultValue,
  isVisible,
}: Props) {
  return (
    <>
      {isVisible && (
        <form>
          <input
            type="text"
            defaultValue={defaultValue}
            className="border p-2 w-full"
          />
        </form>
      )}
    </>
  );
}
