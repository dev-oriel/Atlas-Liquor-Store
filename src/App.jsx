import {
  Hero,
  CustomerReviews,
  Footer,
  PopularProducts,
  Services,
  SpecialOffer,
  Subcribe,
  SuperQuality,
} from "./sections";

const App = () => (
  <main className="relative">
    Nav
    <section className="xl:padding-1 wide:padding-r padding-b">Hero</section>
    <section className="padding">popularProducts</section>
    <section className="padding">superQuality</section>
    <section className="padding-x py-10">services</section>
    <section className="padding">specialOffer</section>
    <section className="bg-pale-blue padding">customerReviews</section>
    <section className="padding-x sm:py-32 py-16 w-full">subscribe</section>
    <section className="bg-black padding-x padding-t pb-8 text-white">
      footer
    </section>
  </main>
);

export default App;
