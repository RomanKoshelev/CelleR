// Celler (c) 2015 Krokodev
// Celler.App.Web
// Size.cs

using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.Structs
{
    public struct Size : IModelled< SizeModel >
    {
        #region Properties

        public readonly double Width;
        public readonly double Height;

        #endregion


        #region Ctors

        public Size( double w, double h )
        {
            Width = w;
            Height = h;
        }

        public Size( SizeModel s )
        {
            Width = s.Width;
            Height = s.Height;
        }

        #endregion


        #region IModelled

        public SizeModel Model
        {
            get { return new SizeModel { Width = Width, Height = Height }; }
        }

        #endregion


        #region Convertors

        public static implicit operator Size( SizeModel m )
        {
            return new Size( m );
        }

        #endregion
    }
}