// Celler (c) 2015 Krokodev
// Celler.App.Web
// Entity.cs

using System;
using Celler.App.Web.Game.Server.Entities.Interfaces;

namespace Celler.App.Web.Game.Server.Entities.Abstract
{
    public abstract class AbstractEntity<T> : IEntity< T >
    {
        #region Ctor

        protected AbstractEntity()
        {
            AsEntity.Id = Guid.NewGuid().ToString();
        }

        #endregion


        #region IModel

        public abstract T ToModel();

        #endregion


        #region IEntity

        public IEntity< T > AsEntity
        {
            get { return this; }
        }

        string IEntity< T >.Id { get; set; }

        #endregion
    }
}