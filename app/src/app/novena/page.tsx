import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/novena" },
  title: "Novena to Our Lady of Guadalupe — Primos Maternos",
  description:
    "The traditional nine-day Novena to Our Lady of Guadalupe, prayed December 3–11 leading into the December 12 feast. Full prayers, daily meditations on the four apparitions, printable.",
};

const days = [
  {
    n: 1,
    date: "December 3",
    title: "The first apparition",
    theme:
      "Mary appears to Juan Diego on the hill of Tepeyac and identifies herself.",
    quote:
      "My dear son, whom I love tenderly, know that I am the Virgin Mary, Mother of the true God, Giver and Maintainer of life, Creator of all things, Lord of heaven and earth, Who is in all places. I wish a temple to be erected here where I can manifest the compassion I have for the natives and for all who solicit my help.",
    reflection:
      "Your words, heavenly Mother, fill my heart with love and gratitude and with renewed faith and hope because they were also directed to me. I turn to you, confident of obtaining through your intercession the grace which will enable me to live in accordance with the teaching of your Divine Son, Jesus, Whom I desire to love with all my heart. You shared in all that my Savior suffered for me; therefore, I belong to you, my loving Mother. Do not abandon me in this vale of tears. Take pity, I beseech you, on my poverty and necessities. Have compassion on my anxieties and cares. Assist and comfort me in all my infirmities and miseries.",
  },
  {
    n: 2,
    date: "December 4",
    title: "The words of the fourth apparition",
    theme:
      "Mary reassures Juan Diego with words that have anchored her devotees for five centuries.",
    quote:
      "Do not let anything afflict you, and do not be afraid of any illness or accident or pain. Am I not here who am your Mother? Are you not under my shadow and protection? Is there anything else that you need?",
    reflection:
      "These words were also directed to me and they fill my heart with gladness and hope. Turn then, most gracious Mother, your eyes of mercy towards me; protect me in your love, making it possible for me to put all my troubles and worries at your feet. I know you will remember you are my Mother, I am under your shadow and protection, and you will obtain for me the consolation of which I am so much in need.",
  },
  {
    n: 3,
    date: "December 5",
    title: "The healing of Juan Bernardino",
    theme:
      "Mary appears to Juan Diego's dying uncle, cures him, and gives him her name.",
    quote:
      "Immaculate Virgin Mary who crushed the Serpent.",
    reflection:
      "You filled the hearts of the Indians with joy. This told them they no longer needed to make human sacrifices to the pagan idols. Hail Holy Queen, merciful Mother. Hail our life, our sweetness and our hope. Permit me to join in the canticles of praise which this whole nation continues sending up to your throne. Many come long distances to offer you gifts and prayers. Pray for us, Holy Mother of God. Exterminate the Serpent of Evil from our lives so we may be made worthy of the promises of Christ, your Divine Son.",
  },
  {
    n: 4,
    date: "December 6",
    title: "The image as a written message",
    theme:
      "The Indians recognize the tilma as a codex — every detail speaks of heaven.",
    quote:
      "Your regal figure in the form of a human being taught them that your dwelling place at one time must have been on earth. The rays of the sun, the clouds surrounding your body, the stars on your garment, the crescent under your feet, the angel transporting you though space — all denote your present home in heaven and called their attention to the immortality of the human soul.",
    reflection:
      "O Holy Mary, as your image on the garment of Juan Diego taught the Indians, so let it teach me never to forget the immortality of my soul, that Heaven is my goal and my inheritance. Amid temptations and miseries of this life, let me think always of this home of peace, glory, and eternal bliss.",
  },
  {
    n: 5,
    date: "December 7",
    title: "The rays of the sun",
    theme:
      "The sun-god of the Aztecs is eclipsed by the woman clothed with light.",
    quote:
      "For centuries the natives of Mexico worshipped the Sun, sacrificing countless human beings in its honor. However, when they beheld your beautiful Image blotting it out so that only its rays are visible, they understood the lesson it was intended to convey.",
    reflection:
      "O Holy Mary, through the mystery of the Incarnation of your beloved Son, our Lord Jesus Christ, wherein our salvation was begun, obtain for us light to understand the greatness of the benefit which He has bestowed upon us in becoming our Brother and in giving you, His own venerated Mother, to be our Mother also.",
  },
  {
    n: 6,
    date: "December 8",
    title: "The stars on the mantle",
    theme:
      "The stars themselves testify — they were created by God, not gods to be adored.",
    quote:
      "The fires that burned on the altars of the false gods were extinguished forever after the Indians had contemplated your Image and seen you attired with the firmament covered with stars. This showed them that the stars had been created by the Invisible God to serve mankind and, therefore, could not be deities to whom adoration and sacrifices were due.",
    reflection:
      "Most Holy Mary, through your image stamped by God on the Indian's garment, you have brought millions of pagans into the light of the true faith. I beg you to obtain for me the grace of understanding the message it contains. Shed upon me the light of your countenance; direct and sanctify all my undertakings.",
  },
  {
    n: 7,
    date: "December 9",
    title: "The cross of our redemption",
    theme:
      "The small black cross at her throat matched the banner of Cortés — a bridge to Christ.",
    quote:
      "The emblem of our redemption, stamped upon the golden brooch fastened to the tunic, served to tell the Indians that the religion of their conquerors was the one they were to embrace. When they saw it upon your Image, they flocked around the Spanish Missionaries eager to know its meaning.",
    reflection:
      "Happy nation to whom you did reveal yourself and God. Holy Virgin, Mary of Guadalupe, my Queen and Mother, inspire us to see in this, your miraculous picture, the instrument for the conversion of all to the Catholic Apostolic Faith, you who are the adorable Queen and Mother of the Apostles and Missionaries.",
  },
  {
    n: 8,
    date: "December 10",
    title: "The roses at Tepeyac",
    theme:
      "The last words Juan Diego heard from her lips: 'You are my ambassador worthy of confidence. Go in peace.'",
    quote:
      "After Juan Diego cut the roses blooming suddenly on the barren hill of Tepeyac, he brought them to you at the foot of the mount where you were waiting. With your own hands you arranged them in his tilma, tying it around his neck. The last words Juan Diego heard from your adorable lips were: 'You are my ambassador worthy of confidence. Go in peace.'",
    reflection:
      "The sacred picture on the coarse cloth of the tilma could not have been painted by human hands. It convinced the Bishop, as it ought, to convince every person who looks at it, that Juan Diego's message was truly yours. Humbly I beseech you, my Queen and Mother, let me be your ambassador like Juan Diego, to give the doctrine contained in your Image to all my friends, to convince them also, whether they be believers or unbelievers.",
  },
  {
    n: 9,
    date: "December 11",
    title: "The conversion of a nation",
    theme:
      "Nine million baptisms in ten years. The drums of human sacrifice were heard no more.",
    quote:
      "O Holy Virgin, enthroned on the spot which you chose in the very heart of an idolatrous nation, you did marvelously work its conversion. After seeing the Image on the tilma of their countryman, Juan Diego, the Indians stripped their temples of all idols. They built beautiful churches on whose towers gleaming crosses shone in the sun. The huge drum, which innumerable times had announced human sacrifices in honor of their gods, was heard no more.",
    reflection:
      "As Juan Diego spent the remaining seventeen years of his life in giving your spoken message to the Indians, so permit me, my loving Mother, to help in making known your celestial message among my countrymen. Animate and bless all who join in the Apostleship and Novena in order to propagate the Catholic religion among their friends, having as their banner your admirable image on Juan Diego's tilma, together with the cross, emblem of our redemption.",
  },
];

const memorare = `Remember, O most gracious Virgin of Guadalupe, that in your heavenly apparitions on the mount of Tepeyac, you promised to show your compassion and pity towards all who, loving and trusting you, seek your help and call upon you in their necessities and afflictions. You promised to hear our supplications, to dry our tears, and to give us consolation and relief. Never has it been known that anyone who fled to your protection, implored your help, or sought your intercession, either for the common welfare, or in personal anxieties, was left unaided.

Inspired by this confidence, we run to you, O Mary, ever-Virgin Mother of the true God. Though grieving under the weight of our sins, we come to prostrate ourselves before your presence, certain that you will fulfill your merciful promises. We fully trust that, standing beneath your shadow and protection, nothing will trouble or afflict us, nor do we need to fear illness, or misfortune, or any other sorrow.

You wanted to remain with us through your admirable Image, you who are our Mother, our health, and our life. Placing ourselves beneath your maternal gaze, and having recourse to you in all our necessities, we need do nothing more.

Our Holy Mother of God, despise not our petitions, but in your mercy hear and answer us. Amen.`;

export default function NovenaPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--gold)] font-semibold">
            December 3 – 11 · Nine days into the feast
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
            Novena to Our Lady of Guadalupe
          </h1>
          <p className="mt-5 text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            The traditional nine-day devotion, one day for each of Mary's
            four apparitions to Juan Diego and to his uncle Juan Bernardino,
            leading into the feast of Our Lady of Guadalupe on December 12.
          </p>
          <p className="mt-4 text-sm text-stone-500">
            Free to use, print, or share. Text follows the traditional
            Novena compiled by Helen Behrens.
          </p>
        </div>
      </section>

      {/* Contents */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-stone-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Contents</h2>
          <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
            <li>
              <a href="#how-to-pray" className="text-[var(--accent)] hover:underline">
                How to pray the Novena
              </a>
            </li>
            <li>
              <a href="#memorare" className="text-[var(--accent)] hover:underline">
                Memorare to Our Lady of Guadalupe
              </a>
            </li>
            {days.map((d) => (
              <li key={d.n}>
                <a
                  href={`#day-${d.n}`}
                  className="text-[var(--accent)] hover:underline"
                >
                  Day {d.n} — {d.date}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How to pray */}
      <section id="how-to-pray" className="max-w-3xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-3">How to pray the Novena</h2>
        <p className="text-stone-700 leading-relaxed mb-3">
          Each day, begin with the day's meditation below. Then pray four
          Hail Marys — one for each of the four apparitions to Saint Juan
          Diego. Close with the Memorare. Some pray-ers also include a
          personal petition after the Memorare, offering it through Our
          Lady's intercession.
        </p>
        <p className="text-stone-700 leading-relaxed">
          The Novena runs December 3–11. December 12 is the feast day
          itself.
        </p>
      </section>

      {/* Memorare */}
      <section
        id="memorare"
        className="bg-stone-50 border-y border-stone-200"
      >
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4">
            Memorare to Our Lady of Guadalupe
          </h2>
          {memorare.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-stone-800 leading-relaxed mb-4 italic"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Nine days */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        {days.map((d) => (
          <article
            key={d.n}
            id={`day-${d.n}`}
            className="mb-14 pb-10 border-b border-stone-200 last:border-0"
          >
            <p className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold">
              Day {d.n} · {d.date}
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold">{d.title}</h2>
            <p className="mt-3 text-stone-600 italic">{d.theme}</p>

            <blockquote className="mt-6 border-l-4 border-[var(--accent)] pl-5 py-2 italic text-stone-700">
              {d.quote}
            </blockquote>

            <p className="mt-6 text-stone-800 leading-relaxed">
              {d.reflection}
            </p>

            <p className="mt-6 text-sm text-stone-500">
              Pray four Hail Marys · then the{" "}
              <a href="#memorare" className="text-[var(--accent)] underline">
                Memorare
              </a>
              .
            </p>
          </article>
        ))}
      </section>

      {/* Print / share */}
      <section className="bg-stone-50 border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl font-bold mb-3">Print or share</h2>
          <p className="text-stone-700 mb-6 max-w-xl mx-auto">
            Use your browser's Print (⌘P or Ctrl+P) to save this Novena as
            a PDF or hand out at your parish. Free to redistribute.
          </p>
          <p className="text-stone-600 text-sm">
            If you would like the tilma image itself on your wall during the
            Novena and the feast,{" "}
            <Link href="/gifts" className="text-[var(--accent)] underline">
              see the canvas gift guide
            </Link>
            . Order by December 4 for December 12 arrival.
          </p>
        </div>
      </section>
    </>
  );
}
