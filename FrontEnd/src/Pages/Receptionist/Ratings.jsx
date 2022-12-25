import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import "./Ratings.css";

const Ratings = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 mb-10 ">
        <Sidebar />
        <div className="col-span-10">
          <div className="flex justify-center ">
            <h1 className="mt-10 bg-yellow-300 text-black text-2xl font-bold rounded-full font-poppins mr-2 py-1 px-12 rounded-2xl tracking-widest">
              Ratings
            </h1>
          </div>
          <div className="Section text-white">
            <div className="Section1 font-poppins rounded-full tracking-wide">
              <strong>Warning : </strong> 
              <span class="font-thin">Your Penalty Count is on level 3 !</span>
            </div>
            <div className="Section2 flex flex-row rounded-full border-2 border-yellow-300">
              <h1 class="text-3xl font-poppins font-thin">
                <strong>Reward Count</strong> : 0
              </h1>
              <button class="bg-yellow-300 text-black btn_rating_1 font-poppins text-sm drop-shadow-2xl">
                Details
              </button>
            </div>
            <div className="Section2 flex flex-row border-2 border-yellow-300">
              <h1 class="text-3xl font-poppins font-thin">
                <strong>Penalty Count</strong>: 3
              </h1>
              <button class="bg-yellow-300 text-black btn_rating_2 font-poppins text-sm text-center">
                View Report
              </button>
            </div>
            <div className="Section3 border-2 border-yellow-300 font-poppins text-3xl text-center">
              Privilege Status : <span class="text-red-500 font-thin">Partially Suspended</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;

/*{<strong>Penalty Count</strong>*/
