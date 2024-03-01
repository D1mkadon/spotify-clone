import { proxy } from "valtio";
const state = proxy({
  trackID: "",
  isPlaying: false,
});
export default state;
