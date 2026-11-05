/**
 * The template's name in giant letters gliding across, with its own home page
 * showing through the letters. The photo stays put while the word moves: a
 * black layer with white letters is multiplied over the photo, so the photo
 * shows only where the letters are. Stops moving for "reduce motion".
 */
export default function NameReel({ name, picture }: { name: string; picture?: string }) {
  const word = `${name} • `;
  return (
    <div className="name-reel relative w-full overflow-hidden bg-ink" aria-hidden="true">
      {picture && <img src={picture} alt="" decoding="async" fetchPriority="high" className="name-reel-photo absolute inset-0 size-full object-cover" />}
      <div className="absolute inset-0 flex items-center bg-ink mix-blend-multiply">
        <div className="name-reel-track flex w-max whitespace-nowrap font-display uppercase text-white">
          {[0, 1].map((half) => (
            <span key={half} className="pr-[0.08em]">
              {word.repeat(3)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
