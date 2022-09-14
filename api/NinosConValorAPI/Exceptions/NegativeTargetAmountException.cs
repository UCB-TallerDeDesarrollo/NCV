using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NinosConValorAPI.Exceptions
{
    public class NegativeTargetAmountException:Exception
    {
        public NegativeTargetAmountException(string message) : base(message) { }
    }
}
