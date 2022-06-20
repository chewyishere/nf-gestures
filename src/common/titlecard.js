export default function TitleCard({ title }) {
  return (
    <div className="boxart block">
      <img
        draggable="false"
        src={`${process.env.PUBLIC_URL}/images/boxshot/${title}.jpg`}
        alt={title}
      />
    </div>
  );
}
