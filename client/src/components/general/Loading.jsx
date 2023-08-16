import "../../scss/loading.scss";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="lds-dual-ring "></div>
    </div>
  );
};

export default Loading;
