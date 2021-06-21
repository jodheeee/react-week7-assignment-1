import TextField from './TextField';

export default function ReviewForm({ onSubmit, onChange }) {
  return (
    <>
      <TextField
        label="평점"
        type="number"
        name="score"
        onChange={onChange}
      />
      <TextField
        label="리뷰 내용"
        type="text"
        name="description"
        onChange={onChange}
      />
      <button
        type="button"
        onClick={onSubmit}
      >
        리뷰 남기기
      </button>
    </>
  );
}
