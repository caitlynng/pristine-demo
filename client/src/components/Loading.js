const Loading = ({ center }) => {
  return (
    <div className="loading-container">
      <div className="loading-wheel-container">
        <div className="loading-wheel"></div>
        <p>Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
