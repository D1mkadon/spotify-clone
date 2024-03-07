import { proxy } from "valtio";
const state = proxy({
  trackID: "",
  isPlaying: false,
  searchPath:''
});
export default state;
