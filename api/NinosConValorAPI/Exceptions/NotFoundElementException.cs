using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NinosConValorAPI.Exceptions
{
    public class NotFoundElementException:Exception
    {
        public NotFoundElementException(string message) : base(message) { }

    }
}
