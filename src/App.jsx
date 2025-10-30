import { Switch, Route } from "wouter";
import HomePage from "./pages/Home";
import ChatbotUI from "./pages/ChatbotUI";
import OnboardingUI from "./pages/OnBoardingDoc";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/OnboardingDoc" component={OnboardingUI} />
      <Route path="/QnAchat" component={ChatbotUI} />

    </Switch>
  );
}

export default Router;
