import Image from "next/image";
import Logo from "./assets/img/sakshat-white.png";
import CopyID from "./components/home/CopyID";
import BMCQR from "./assets/img/bmc_qr.png";
import BMC from "./assets/img/bmc_gif.gif";
import Form from "./components/home/Form";
import Video from "./components/home/Video";
import VideoCall from "./components/home/VideoCall";

export default function Home() {
  return (
    <div className="w-screen h-screen font-[family-name:var(--primary)]" id="bkg">
      <section className="pb-10 bg-[var(--primary-color)] text-white">
        <header className="flex justify-between p-5 items-center w-full">
          <Image src={Logo} alt="Sakshat logo" width={100} />
          <CopyID />
        </header>
        <div className="flex items-center justify-center flex-col">
          <div className="w-11/12">
            <p className="font-[family-name:var(---primary)] md:text-6xl text-2xl my-1 md:my-2 font-medium text-center">
              Your Voice, Your Privacy
            </p>
            <p className="font-[family-name:var(---primary)] md:text-xl text-sm mb-2 md:my-2 text-center font-light">
              Connect with others, share ideas, and stay anonymous —{" "}
              <span className="font-medium">no strings attached</span>
            </p>
          </div>
        </div>
      </section>
      <section className="relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white py-3 px-3 rounded-md  w-11/12 md:w-2/4">
        <VideoCall/>
          <div className="flex flex-wrap-reverse">
            <div className="flex md:flex-1 items-end gap-3 flex-wrap mt-2 max-sm:justify-center w-full md:w-max">
              <a
                href="https://www.buymeacoffee.com/rawat"
                target="_blank"
                className="w-full md:w-[150px] md:h-[150px] hidden md:block"
              >
                <Image
                  src={BMCQR}
                  alt="Chat without saving number, buy me a coffee"
                  width={150}
                  height={150}
                  className="w-full"
                />
              </a>
              <div className="w-full md:hidden bg-slate-100 my-1 h-[1px] rounded-full"/>
              <a
                href="https://www.buymeacoffee.com/rawat"
                target="_blank"
                className="p-2 px-3 rounded-full bg-[#ffdd00] flex gap-1 items-center max-sm:w-full justify-center"
              >
                <Image
                  src={BMC}
                  alt="Chat without saving number, buy me a coffee"
                  width={25}
                  height={25}
                  unoptimized
                />
                <p className="text-sm font-medium">Buy me a coffee</p>
              </a>
            </div>
            <div className="md:flex-1 w-full md:w-3/4">
              <Form/>
              <small className="text-slate-400 text-xs">
                <i>You can copy your id from top right corner</i>
              </small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
