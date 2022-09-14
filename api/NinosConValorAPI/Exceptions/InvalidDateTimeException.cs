using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NinosConValorAPI.Exceptions
{
    public class InvalidDateTimeException : Exception
    {
        public InvalidDateTimeException(string message) : base(message) { }
    }
}
