"use client";
import { getCookie } from "@/actions/cookie";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RootPage() {
  const [cookie, setCookie] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      const _cookie = await getCookie("edgestore-token");

      setCookie(_cookie?.value ?? "");
    }

    getData();
  }, []);

  return <div>{cookie}</div>;
}
