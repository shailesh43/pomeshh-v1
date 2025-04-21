
import React from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/timer", { replace: true });
  }, []);

  return null;
};

export default Index;
