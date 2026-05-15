import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/pattern')({
  component: PatternLayout,
})

function PatternLayout() {
  return <Outlet />
}
