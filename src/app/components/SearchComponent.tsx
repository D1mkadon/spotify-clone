import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const SearchComponent = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search/${inputValue}`);
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="relative flex items-center justify-start"
    >
      <label className="absolute left-2" htmlFor="search">
        <Image src={"/search.svg"} alt="" width={16} height={16} />
      </label>
      <input
        ref={inputRef}
        id="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="What do you want to play"
        className="bg-white/10 opacity-80 pl-7 pr-2 py-2 rounded-full outline-none hover:opacity-100 focus:opacity-100 focus:shadow-[0_0_0_2px_#fff]"
      ></input>
    </form>
  );
};

export default SearchComponent;
