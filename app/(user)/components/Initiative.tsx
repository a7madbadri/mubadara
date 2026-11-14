import Button from "@/components/Button";
import CustomLink from "@/components/CustomLink";
import { useDemo } from "@/context/demo-context";
import { DemoInitiative } from "@/types/demo";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Initiative({
  id,
  title,
  coverImage,
  summary,
  followerIds,
  activityIds,
  contributorIds,
}: DemoInitiative) {
  const { currentUser, isReady, followInitiative, unfollowInitiative } =
    useDemo();
  const router = useRouter();
  const isFollowing = followerIds.includes(currentUser?.id ?? "");
  const handleFollow = () => {
    if (isReady && currentUser) {
      isFollowing ? unfollowInitiative(id) : followInitiative(id);
    } else {
      alert(123);
      router.push("/login");
    }
  };
  return (
    <div
      className="rounded-xl overflow-hidden relative pt-30 border border-slate-100"
      key={id}
    >
      <Image
        src={coverImage || "/images/initiatives/init_1.avif"}
        alt="initiative cover"
        width={1000}
        height={200}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="relative z-1 bg-linear-to-b from-transparent to-20% to-black/70 pt-6 px-3 pb-3 text-white">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{summary}</p>
        <div className="flex my-2">
          <div className="flex flex-col items-center w-1/3 py-1">
            <span className="text-sm font-bold">{followerIds.length}</span>
            <label className="text-xs">المتابعين</label>
          </div>
          <div className="flex flex-col items-center w-1/3 py-1">
            <span className="text-sm font-bold">{activityIds.length}</span>
            <label className="text-xs">النشاطات</label>
          </div>
          <div className="flex flex-col items-center w-1/3 py-1">
            <span className="text-sm font-bold">{contributorIds.length}</span>
            <label className="text-xs">المساهمين</label>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="flex-1" variant="accent" onClick={handleFollow}>
            {isFollowing ? "إلغاء المتابعة" : "متابعة"}
          </Button>
          <CustomLink href={`/initiatives/${id}`}>تفاصيل المبادرة</CustomLink>
        </div>
      </div>
    </div>
  );
}
