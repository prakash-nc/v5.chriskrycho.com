import { DateTime, DateTimeOptions } from 'luxon'
import { Maybe } from 'true-myth'

type Parse = (text: string, options?: DateTimeOptions | undefined) => DateTime

const maybeDateTime = (parse: Parse, input: string): Maybe<DateTime> => {
   const parsed = parse(input)
   return parsed.isValid ? Maybe.just(parsed) : Maybe.nothing()
}

// Same parsing rules as 11ty itself uses: ISO or SQL, nothing else.
export const toDateTime = (input: string): DateTime => {
   return maybeDateTime(DateTime.fromISO, input)
      .or(maybeDateTime(DateTime.fromSQL, input))
      .unwrapOrElse(() => {
         throw new Error(`Could not parse date: ${input}`)
      })
}

export default toDateTime