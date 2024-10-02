import toast from "react-hot-toast";


export const successToast = (text: string) => toast.success(text, {
    duration: 2000,
  });

export const warningToast = (text: string) => toast(text,{
    duration: 4000,
    position: 'bottom-center',
  
    // Styling
    style: {},
    className: '',
  
    // Custom Icon
    icon: '⚠️',
  
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
  
  })

export const errorToast = (text: string = "Something went wrong") =>
  toast.error(text, {
    duration: 2000,
  });

export const incomingCallToast = (caller: string | null)=>{
    toast.custom(
        `<div className="flex">
        <p className="m-0">{caller} calling...</p>
        <div className="p-4 rounded-full w-4 h-4 bg-red-600">
            <HiPhone className="text-white" />
        </div>
        <div className="p-4 rounded-full w-4 h-4 bg-green-600">
            <HiPhone className="text-white" />
        </div>
        </div>`
        )
}

export const copyToClipboard = (textToCopy: string) => {
  try {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        successToast("Copied");
      })
      .catch((err) => {
        errorToast();
      });
  } catch (err) {
    errorToast();
  } finally {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }
};
