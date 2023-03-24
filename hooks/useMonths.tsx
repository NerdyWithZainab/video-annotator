import { useIntl, IntlShape } from "react-intl";

export default function useMonths() {
  const intl: IntlShape = useIntl();
  const months: string[] = [
    intl.formatMessage({ id: "JANUARY", defaultMessage: "January" }),
    intl.formatMessage({ id: "FEBRUARY", defaultMessage: "February" }),
    intl.formatMessage({ id: "MARCH", defaultMessage: "March" }),
    intl.formatMessage({ id: "APRIL", defaultMessage: "April" }),
    intl.formatMessage({ id: "MAY", defaultMessage: "May" }),
    intl.formatMessage({ id: "JUNE", defaultMessage: "June" }),
    intl.formatMessage({ id: "JULY", defaultMessage: "July" }),
    intl.formatMessage({ id: "AUGUST", defaultMessage: "August" }),
    intl.formatMessage({ id: "SEPTEMBER", defaultMessage: "September" }),
    intl.formatMessage({ id: "OCTOBER", defaultMessage: "October" }),
    intl.formatMessage({ id: "NOVEMBER", defaultMessage: "November" }),
    intl.formatMessage({ id: "DECEMBER", defaultMessage: "December" }),
  ];

  return { months };
}
