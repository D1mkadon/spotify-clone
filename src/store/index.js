import { proxy } from "valtio";
const state = proxy({
  trackID: "",
  isPlaying: false,
  searchPath: "",
  device: "",
});
export default state;
