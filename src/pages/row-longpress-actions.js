export default function RowLongPressActions({ row }) {
  return (
    <div className="lolomo__row__titles">
      {row.map((_title) => (
        <div key={_title} className="boxart block">
          <img
            draggable="false"
            src={`${process.env.PUBLIC_URL}/images/boxshot/${_title}.jpg`}
            alt={_title}
          />
        </div>
      ))}
    </div>
  );
}
