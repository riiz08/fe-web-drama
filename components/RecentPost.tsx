import { Link } from "@heroui/link";

interface Post {
  title: string;
  slug: string;
}

interface RecentPostProps {
  recentPost: Post[];
}

const RecentPost: React.FC<RecentPostProps> = ({ recentPost }) => {
  return (
    <div className="flex flex-col my-2">
      {recentPost.map((post) => (
        <Link
          color="secondary"
          href={`/watch/${post.slug}`}
          key={post.slug}
          size="sm"
        >
          {post.title}
        </Link>
      ))}
    </div>
  );
};

export default RecentPost;
