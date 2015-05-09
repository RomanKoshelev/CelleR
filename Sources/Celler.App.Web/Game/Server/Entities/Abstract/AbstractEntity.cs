// Celler (c) 2015 Krokodev
// Celler.App.Web
// AbstractEntity.cs

using System;
using Celler.App.Web.Game.Server.Entities.Interfaces;

namespace Celler.App.Web.Game.Server.Entities.Abstract
{
    public abstract class AbstractEntity<T> : IIdentifiable, IModelable< T >
    {
        #region Ctor

        protected AbstractEntity()
        {
            IIdentifiable.Id = Guid.NewGuid().ToString();
        }

        #endregion


        #region IIdentifiable

        public IIdentifiable IIdentifiable
        {
            get { return this; }
        }

        string IIdentifiable.Id { get; set; }

        #endregion


        #region IModel

        public abstract T ToModel();

        #endregion
    }
}