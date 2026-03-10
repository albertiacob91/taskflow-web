type AvatarProps = {
  name?: string | null;
  email?: string | null;
};

export function Avatar({ name, email }: AvatarProps) {
  const label = name || email || 'U';

  const initials = label
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
      {initials}
    </div>
  );
}