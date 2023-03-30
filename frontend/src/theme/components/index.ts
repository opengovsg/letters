import { Button } from './Button'
import { Link } from './Link'
import { Pagination, PAGINATION_THEME_KEY } from './Pagination'

export const components = {
  Button,
  Link,
  [PAGINATION_THEME_KEY]: Pagination,
}
