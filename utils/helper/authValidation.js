export const testAuth = (session, role = null) => {
  if (!session) throw "UNAUTHENTICATED USER";
  if (role && session?.user?.role !== role) throw "UNAUTHORIZED ACTION";
};
