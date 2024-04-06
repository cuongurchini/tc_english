import { Spin } from "antd";
import "./loadingPage.s.scss";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default LoadingPage;
