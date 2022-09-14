<<<<<<< HEAD
﻿namespace NinosConValorAPI.Exceptions
{
    public class NotFoundElementException : Exception
    {
        public NotFoundElementException(string message) : base(message)
        {

        }
=======
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NinosConValorAPI.Exceptions
{
    public class NotFoundElementException:Exception
    {
        public NotFoundElementException(string message) : base(message) { }
>>>>>>> 19de6d8 (Added backend elements (AuthController, UserService, Models for Login, Register and manage response) and configurations for Identity and JWT)
    }
}
