
import imgTrainer from "../assets/trainer-orange.png";
import crossfitImg from "../assets/crossfit.png";
import karateImg from "../assets/karate.png";
import imgEq from "../assets/eq-orange.png";

const features = [
  {
    title: "Expert Trainers",
    desc: "Certified trainers guiding you to reach your fitness goals efficiently.",
    icon: crossfitImg
  },
  {
    title: "Modern Equipment",
    desc: "State-of-the-art machines and facilities for safe and effective training.",
    icon: imgEq
  },
  {
    title: "Motivating Environment",
    desc: "Positive and energetic atmosphere that keeps you consistent.",
    icon: karateImg
  },
  {
    title: "Nutrition & Wellness",
    desc: "Guidance for balanced diet and overall health improvement.",
    icon: imgTrainer
  }
];

const GymDetailsSec2 = () => {
  return (
    <section className="relative bg-white py-24 px-6 lg:px-16">

      {/* Background floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-orange-100 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-50 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE */}
        <div className="relative">
          <img
            src={imgTrainer}
            className="rounded-3xl shadow-2xl w-full object-cover hover:scale-105 transition duration-500"
          />

          {/* Floating Stat */}
          <div className="absolute -bottom-8 -left-8 bg-white border border-gray-200 shadow-lg rounded-2xl px-6 py-5">
            <h3 className="text-3xl font-bold text-orange-500">10+</h3>
            <p className="text-gray-600 text-sm font-medium">Years Experience</p>
          </div>

        </div>

        {/* RIGHT Features */}
        <div className="space-y-8">

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Build Your <span className="text-orange-500">Best Body</span>
          </h2>

          {features.map((item, i) => (
            <div
              key={i}
              className="group flex items-center gap-5 bg-gray-50 p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
            >

              <div className="bg-orange-50 p-3 rounded-lg">
                <img src={item.icon} className="w-10 h-10 object-cover" />
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-500 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default GymDetailsSec2;

