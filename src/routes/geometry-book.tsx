import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/geometry-book')({
  component: GeometryBookLayout,
})

function GeometryBookLayout() {
  return <Outlet />
}
